package com.byteplus_player.camera;
import android.media.MediaRecorder;
import android.os.Environment;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@ReactModule(name = CameraModule.NAME)
public class CameraModule extends ReactContextBaseJavaModule {
    public static final String NAME = "CameraModule";
    private static ReactApplicationContext reactContext;
    private MediaRecorder mediaRecorder;
    private String videoFilePath;
    private CameraView cameraView;
    private boolean isFlashOn = false;
    private boolean isPaused = false;
    public CameraModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "CameraModule";
    }

    public void setCameraView(CameraView view) {
        this.cameraView = view;
    }


    public String createFile() throws Exception {
        File Store=Environment.getExternalStorageDirectory();
        File dir= new File(Store,"MyClipVideos");
        if(!dir.exists()){
           Boolean result = dir.mkdir();
            System.out.println("====result===");
            System.out.println(result);
        }
        File file;
        String fileName;
        do {
            fileName = UUID.randomUUID().toString() + ".mp4";
            file = new File(dir, fileName);
        } while (file.exists());
        file.createNewFile();
        return file.getPath();
    }

    @ReactMethod
    public void startRecording(int width, int height, Callback errorCallback, Callback successCallback) {
        try {
            String path =createFile();
            System.out.println("=====new path====");
            System.out.println(path);
            mediaRecorder = new MediaRecorder();
            cameraView.startRecording(mediaRecorder,path, width, height);
            videoFilePath = path;
            successCallback.invoke();
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void stopRecording(Callback successCallback) {
       try {
           cameraView.stopRecording(mediaRecorder);
           successCallback.invoke(videoFilePath);
       } catch (Exception e){
           System.out.println("=====error stop recording=====");
           System.out.println(e);
       }
    }

    @ReactMethod
    public void pauseRecording(Callback errorCallback, Callback successCallback) {
        try {
            cameraView.pauseRecording(mediaRecorder);
            successCallback.invoke();
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void resumeRecording(Callback errorCallback, Callback successCallback) {
        try {
            cameraView.resumeRecording(mediaRecorder);
            successCallback.invoke();
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }


    @ReactMethod
    public void getExternalStorageDirectoryPath(Promise promise) {
        try {
            String externalStoragePath = Environment.getExternalStorageDirectory().getAbsolutePath();
            promise.resolve(externalStoragePath);
        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }
}

