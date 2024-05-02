package com.cyber.escape.domain.notification.service;


import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.cyber.escape.domain.notification.document.Notify;
import com.cyber.escape.domain.notification.dto.NotifyDto;
import com.cyber.escape.domain.notification.repository.EmitterRepositoryImpl;
import com.cyber.escape.domain.notification.repository.NotifyRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private static final Long DEFAULT_TIMEOUT = 60L * 60 * 1000;
    private final EmitterRepositoryImpl emitterRepository;
    // private final NoteRepository noteRepository;
    private final NotifyRepository notifyRepository;
    // private final ObjectMapper objectMapper;
    //private final NotifyMapper notifyMapper;
    private final MongoTemplate mongoTemplate;

    // subscribe
    public SseEmitter subscribe(String userUuid, String lastEventId){
        log.info("NotificationService ============ start subscribe..");
        String id = userUuid + "_" + System.currentTimeMillis();
        log.info("NotificationService ============ id : {}, lastEventId: {}", id, lastEventId);
        SseEmitter sseEmitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));
        // SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);

        log.info("NotificationService ============ save emitter completed");

        // 시간이 만료된 경우에 대해 자동으로 레포지토리에서 삭제 처리해줄 수 있는 콜백을 등록해놓을 수 있다.
        sseEmitter.onCompletion(() -> emitterRepository.deleteById(id));
        sseEmitter.onTimeout(() -> emitterRepository.deleteById(id));
        // sseEmitter.onError();

        // sendToClient(sseEmitter, id, "EventStream Created. memberId = {" + memberId + "}");
        sendToClient(sseEmitter, id, "젭라 살려줏메");
        log.info("NotificationService ============ sendToClient completed");

        // 클라이언트가 미수신한 알림에 대해 전송
        if(!lastEventId.isEmpty()){
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithId(String.valueOf(userUuid));
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> sendToClient(sseEmitter, entry.getKey(), entry.getValue()));
        }

        return sseEmitter;
    }

    // 알림이 필요한 곳에서 이 함수를 호출하면 됩니다.
    public void send(String receiverUuid, Notify.NotificationType notificationType, String content){
        log.info("NotificationService ============= send() 시작");

        Notify notification = notifyRepository.save(createNotify(receiverUuid, notificationType, content));
        // Notify notification = createNotify(receiverId, notificationType, content);

        // receiver = 현재 로그인 한 유저 = 알림 받을 사람
        // String receiverId = receiver.getMemberId();

        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterByIdStartWith(String.valueOf(receiverUuid));
        sseEmitters.forEach(
                (key, sseEmitter) -> {
                    emitterRepository.saveEventCache(key, notification);
                    sendToClient(sseEmitter, key, NotifyDto.Response.from(notification));
                }
        );

        log.info("NotificationService ============= send() 끝");
    }

    private Notify createNotify(String receiverUuid, Notify.NotificationType notificationType, String content) {
        // Todo : sender 있는 경우, 없는 경우 나누기
        return Notify.builder()
                // .sender(sender)
                .receiverUuid(receiverUuid)
                .notificationType(notificationType)
                .content(content)
                .isRead('F')
                .build();
    }

    private void sendToClient(SseEmitter sseEmitter, String id, Object data){
        try{
            log.info("sendToClient ============ sendToClient start");
            sseEmitter.send(SseEmitter.event()
                    .id(id)
                    .name("sse")
                    .data(data));
            log.info("sendToClient ============ sendToClient completed");
        } catch (IOException e){
            log.info("sendToClient ============ sendToClient failed");
            emitterRepository.deleteById(id);
            throw new RuntimeException("연결 오류");
        }
    }

    // 안 읽은 목록들 추출
    public List<NotifyDto.Response> getNotifyList(String userUuid){
        List<Notify> notifyList = notifyRepository.findByReceiverUuidAndIsRead(userUuid, 'F');
        //return notifyMapper.NotifyToNotifyDtoResponse(notifyList);
        return null;
    }

    public void markAsRead(List<ObjectId> objectIdList){
        for(ObjectId objectId : objectIdList){
            log.info("objectId : " + objectId);
            Notify unreadNotify = notifyRepository.findById(objectId)
                    .orElseThrow(() -> new RuntimeException("Document를 찾을 수 없습니다."));

            Notify readNotify = Notify.builder()
                    .id(unreadNotify.getId())
                    .receiverUuid(unreadNotify.getReceiverUuid())  // Maintain other fields
                    .content(unreadNotify.getContent())      	// Maintain other fields
                    .notificationType(unreadNotify.getNotificationType())  // Maintain other fields
                    .isRead('T')  // Mark as read
                    .createdAt(unreadNotify.getCreatedAt())  	// Maintain other fields
                    .build();

            mongoTemplate.save(readNotify);
        }
    }
}
