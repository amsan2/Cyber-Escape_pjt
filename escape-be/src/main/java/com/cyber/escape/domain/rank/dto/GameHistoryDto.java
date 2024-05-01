package com.cyber.escape.domain.rank.dto;

import lombok.*;

import java.sql.Time;
import java.time.LocalTime;


public class GameHistoryDto {
    @Getter
    @Builder
    public static class Request{
        private String userUuid;
        private String themaUuid;
        private LocalTime clearTime;
    }

}
