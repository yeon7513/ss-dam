package com.ss_dam.global.image.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import com.ss_dam.global.image.Images;

public interface ImageService {

  String uploadImage(MultipartFile file, String folder) throws IOException;

  Resource loadImage(String folder, String fileName) throws MalformedURLException;

  List<Images> searchFeedImagesByFeedCode(Long feedCode);

}
