package com.example.soccerCommunity.service;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.soccerCommunity.config.S3Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class ImageService {

    private final S3Config s3Config;

    public ImageService(S3Config s3Config){

        this.s3Config = s3Config;
    }

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private String localLocation = "C:\\image\\";

    public String imageUpload(MultipartRequest request) throws IOException {

        MultipartFile file = request.getFile("upload"); // upload 키 값을 가진 파일 꺼내기

        String fileName = file.getOriginalFilename();
        String ext = fileName.substring(fileName.indexOf(".")); // 확장자명

        String uuidFileName = UUID.randomUUID() + ext; // 파일이름 재정의. 같으면 덮어쓰기가 되기 때문
        String localPath = localLocation + uuidFileName;

        // 로컬 서버에 일단 저장
        File localFile = new File(localPath);
        file.transferTo(localFile);

        // s3에 저장
        s3Config.amazonS3Client().putObject(new PutObjectRequest(bucket, uuidFileName, localFile).withCannedAcl(CannedAccessControlList.PublicRead));
        String s3Url = s3Config.amazonS3Client().getUrl(bucket, uuidFileName).toString();

        // 로컬에 저장한 이미지 삭제
        localFile.delete();

        return s3Url;
    }
}
