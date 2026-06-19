import ScanResult, { ApiOutput } from "@/components/ScanResult";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EscanearScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiResult, setApiResult] = useState<ApiOutput | null>(null);

  if (!permission) {
    return <View style={styles.containerBlack} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={60} color="#95D5B2" />
        <Text style={styles.permissionText}>
          Necesitamos acceso a tu cámara para poder escanear las botellas y
          sumar tus puntos.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Habilitar Cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const tomarFoto = async () => {
    if (cameraRef.current && !isAnalyzing) {
      try {
        setIsAnalyzing(true);
        const foto = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
        });

        //aca hacer el fetch con la api

        //mock de ejemplo
        setTimeout(() => {
          setApiResult({
            date: "2026-06-19T21:37:14.164+00:00",
            data: [{ type: "PET-1", amount: 1 }],
            image: foto?.base64 || "",
          });
          setIsAnalyzing(false);
        }, 1500);
      } catch (error) {
        console.error("Error al capturar/enviar la foto:", error);
        setIsAnalyzing(false);
      }
    }
  };

  const reiniciarEscaner = () => {
    setApiResult(null);
  };

  //si hay resultado de la api mostramos el componente ScanResult, sino mostramos la cámara
  if (apiResult) {
    return <ScanResult result={apiResult} onReset={reiniciarEscaner} />;
  }

  return (
    <View style={styles.containerBlack}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef}>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={32} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.scanAreaContainer}>
          <View style={styles.scanSquare}>
            <View style={[styles.corner, styles.topLeftCorner]} />
            <View style={[styles.corner, styles.topRightCorner]} />
            <View style={[styles.corner, styles.bottomLeftCorner]} />
            <View style={[styles.corner, styles.bottomRightCorner]} />
            {isAnalyzing && <ActivityIndicator size="large" color="#4A90E2" />}
          </View>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.captureButtonOuter}
            onPress={tomarFoto}
            disabled={isAnalyzing}
          >
            <View style={styles.captureButtonInner}>
              <Ionicons name="camera" size={28} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBlack: {
    flex: 1,
    backgroundColor: "#000",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FFF2",
  },
  // permisos
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A110D",
    padding: 20,
  },
  permissionText: {
    textAlign: "center",
    color: "#E8F0EA",
    fontSize: 16,
    marginVertical: 20,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: "#1B4332",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#95D5B2",
  },
  permissionButtonText: {
    color: "#95D5B2",
    fontWeight: "bold",
    fontSize: 16,
  },

  // camara
  camera: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  scanAreaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanSquare: {
    width: 280,
    height: 380,
    justifyContent: "center",
    alignItems: "center",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#4A90E2",
    borderWidth: 3,
  },
  topLeftCorner: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRightCorner: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeftCorner: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRightCorner: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  controlsContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
    paddingBottom: 80,
  },
  captureButtonOuter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
