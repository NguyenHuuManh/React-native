package com.byteplus_player.camera;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class CameraManager extends SimpleViewManager<CameraView> {
    public static final String REACT_CLASS = "RCTCameraView";
    ReactApplicationContext reactContext;
    public CameraManager(ReactApplicationContext reactContext) {
       this.reactContext=reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected CameraView createViewInstance(ThemedReactContext reactContext) {
        CameraView view = new CameraView(reactContext, null);
        CameraModule module = reactContext.getNativeModule(CameraModule.class);
        module.setCameraView(view);
        return view;
    }

}
