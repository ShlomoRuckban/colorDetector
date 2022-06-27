package com.colordetector;

import android.annotation.SuppressLint;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.media.Image;
import androidx.camera.core.ImageProxy;
import androidx.palette.graphics.Palette;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;

 import com.colordetector.utils.YuvToRgbConverter;

import java.util.List;

public class PaletteFrameProcessorPlugin extends FrameProcessorPlugin {
    private final YuvToRgbConverter yuvToRgbConverter;
    @SuppressWarnings("FieldCanBeLocal")
    private static final int DEFAULT_COLOR = Color.BLACK;

    @SuppressLint("UnsafeOptInUsageError")
    @Nullable
    @Override
    public Object callback(@NonNull ImageProxy imageProxy, @NonNull Object[] params) {
        Image image = imageProxy.getImage();
        if (image == null) {
            // Image Proxy is empty!
            return null;
        }
        Bitmap bitmap = Bitmap.createBitmap(image.getWidth(), image.getHeight(), Bitmap.Config.ARGB_8888);
        yuvToRgbConverter.yuvToRgb(image, bitmap);

        Palette.Builder builder = new Palette.Builder(bitmap);
        Palette palette = builder.generate();
        List<Palette.Swatch> colors = palette.getSwatches();

        WritableNativeMap result = new WritableNativeMap();

        return colors.toString();
    }

    class  color{
        String rgb;
        int pop;
        color(String colorInRgb, int population){
            rgb= colorInRgb;
            pop = population;
        }
    }

    private String rgbIntToHexString(int rgb) {
        return String.format("#%06X", (0xFFFFFF & rgb));
    }
    //Context context

    PaletteFrameProcessorPlugin(Context context) {
        super("getColorPalette");
        yuvToRgbConverter = new YuvToRgbConverter(context);
    }
}