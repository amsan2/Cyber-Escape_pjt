package com.cyber.escape.domain.notification.controller;

import java.util.ArrayList;
import java.util.List;

import com.cyber.escape.domain.notification.document.Notify;
import com.cyber.escape.domain.notification.dto.NotifyDto;
import com.cyber.escape.domain.notification.service.NotificationService;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.common.dto.ApiResponse;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/notify")
public class NotificationController {
    private final NotificationService notificationService;
    //private final JWTUtil jwtUtil;

    // Todo : member 완성 후 로그인한 유저의 id값 가져오기 (uri까지 수정 필요)
    // id : member의 PK 값
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId){
        // Long id = 12L;
        //Long id = jwtUtil.getLoginMemberId();
        String uuid = UserUtil.getUserUuid();
        log.info("subscribe !!! uuid : {}, Last-Event-ID : {}", uuid, lastEventId);
        SseEmitter sseEmitter = notificationService.subscribe(uuid, lastEventId);

        log.info("NotificationController ============ subscribe completed, sseEmitter : {}", sseEmitter);
        return sseEmitter;
    }

    @GetMapping("/list")
    public ApiResponse<List<Object>> getUnreadNotifyList(){
        log.info("NotificationController ========== getNotReadNoteList() start ..");
        return new ApiResponse<>(HttpStatus.OK.value(), "get Unread Notify List Success !!", notificationService.getNotifyList());
    }

    @PostMapping("/read")
    public ApiResponse<String> setUnreadToRead(@RequestBody List<String> stringObjectIdList){
        List<ObjectId> objectIdList = new ArrayList<>();
        for(String s : stringObjectIdList){
            objectIdList.add(new ObjectId(s));
        }
        notificationService.markAsRead(objectIdList);
        return new ApiResponse<>(HttpStatus.OK.value(), "알림 읽음 완료 !!!");
    }


    // 디버깅 용 메서드
//    @PostMapping("/sendtest/{senderId}/{receiverId}")
//    public void sendTest(@PathVariable Long senderId, @PathVariable Long receiverId){
//        // Member sender = Member.builder()
//        // 	.memberId(String.valueOf(senderId))
//        // 	.build();
//        // Member receiver = Member.builder()
//        // 	.memberId(String.valueOf(receiverId))
//        // 	.build();
//
//        notificationService.send(receiverId, Notify.NotificationType.CHAT, "test content");
//    }
}

