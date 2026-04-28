package com.ss_dam.common.image;

import java.io.IOException;
import java.net.MalformedURLException;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

  String uploadImage(MultipartFile file, String folder) throws IOException;

  Resource loadImage(String folder, String fileName) throws MalformedURLException;

}
