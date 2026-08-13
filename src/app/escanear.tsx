import ScanResult, { ApiOutput } from "@/components/ScanResult";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EscanearScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiResult, setApiResult] = useState<ApiOutput | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const cerrarCamara = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  };

  if (!permission) {
    return <View style={styles.containerBlack} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={cerrarCamara} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="close" size={32} color="#FFF" />
        </TouchableOpacity>
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
        setToastMessage(null);
        const foto = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
        });

        //aca hacer el fetch con la api
        try {
          const res = await fetch("https://easy.veloso.net.ar/recycling/scan", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: foto?.base64 || "",
            }),
          });

          if (res.status === 400) {
            showToast("No se ha detectado ningún envase reciclable.");
            setIsAnalyzing(false);
            return;
          }

          if (!res.ok) {
            showToast("No se ha detectado ningún envase reciclable.");
            setIsAnalyzing(false);
            return;
          }

          const data = await res.json();

          if (!data || !data.data || data.data.length === 0) {
            showToast("No se ha detectado ningún envase reciclable.");
          } else {
            setApiResult(data);
          }
        } catch (error) {
          console.error("Error al obtener data de la api:", error);
          showToast("No se ha detectado ningún envase reciclable.");
        }

        setIsAnalyzing(false);

      } catch (error) {
        console.error("Error al capturar/enviar la foto:", error);
        showToast("No se ha detectado ningún envase reciclable.");
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
      <CameraView style={styles.camera} facing="back" ref={cameraRef} />

      <TouchableOpacity
        style={styles.closeButton}
        onPress={cerrarCamara}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={32} color="#FFF" />
      </TouchableOpacity>

      {toastMessage && (
        <View style={styles.toastContainer}>
          <Ionicons name="alert-circle-outline" size={22} color="#FF6B6B" />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {isAnalyzing && (
        <View style={styles.loaderOverlay} pointerEvents="none">
          <View style={styles.loaderCard}>
            <ActivityIndicator size="large" color="#95D5B2" />
            <Text style={styles.loaderText}>Analizando envase...</Text>
          </View>
        </View>
      )}

      <View style={styles.controlsContainer} pointerEvents="box-none">
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
    zIndex: 100,
    elevation: 25,
  },
  toastContainer: {
    position: "absolute",
    top: 100,
    alignSelf: "center",
    backgroundColor: "rgba(20, 20, 20, 0.92)",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    elevation: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 107, 0.5)",
    maxWidth: "85%",
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 8,
    textAlign: "center",
  },
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    zIndex: 999,
    elevation: 50,
  },
  loaderCard: {
    backgroundColor: "rgba(20, 30, 25, 0.95)",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(149, 213, 178, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 50,
  },
  loaderText: {
    color: "#E8F0EA",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
    zIndex: 100,
    elevation: 25,
  },
  captureButtonOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: "#FFF",
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
