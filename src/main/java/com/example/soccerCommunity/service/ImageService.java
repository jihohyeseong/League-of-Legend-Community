package com.example.soccerCommunity.service;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.example.soccerCommunity.config.S3Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class ImageService {

    private final S3Config s3Config;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public ImageService(S3Config s3Config){
        this.s3Config = s3Config;
    }

    public String imageUpload(MultipartRequest request) throws IOException {
        MultipartFile file = request.getFile("upload"); // upload 키 값을 가진 파일 꺼내기

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("업로드할 파일이 없습니다.");
        }

        String fileName = file.getOriginalFilename();
        String ext = fileName.substring(fileName.lastIndexOf(".")); // 확장자명
        String uuidFileName = UUID.randomUUID() + ext; // 파일명 중복 방지

        // S3에 바로 업로드
        s3Config.amazonS3Client().putObject(
                bucket,
                uuidFileName,
                file.getInputStream(),
                null // 메타데이터 설정 가능, 여기서는 생략
        );
        // 퍼블릭 읽기 권한 추가
        s3Config.amazonS3Client().setObjectAcl(bucket, uuidFileName, CannedAccessControlList.PublicRead);

        // 업로드된 파일 URL 반환
        return s3Config.amazonS3Client().getUrl(bucket, uuidFileName).toString();
    }
}
