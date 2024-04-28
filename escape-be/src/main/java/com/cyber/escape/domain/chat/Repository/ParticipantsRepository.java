package com.cyber.escape.domain.chat.Repository;

import com.cyber.escape.domain.chat.entity.Participants;
import com.cyber.escape.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ParticipantsRepository extends JpaRepository<Participants, Long> {

    public Optional<Participants> findByUuid(String uuid);
//    @Query("SELECT u FROM participants u WHERE u.uuid IN :uuids")
//    Optional<List<User>> findByUuids(@Param("uuids") List<String> uuids);

}
