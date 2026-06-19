import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EscanearScreen() {
  // Hook de Expo para manejar los permisos de la cámara
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  // 1. Estado de carga inicial de permisos
  if (!permission) {
    return <View style={styles.container} />;
  }

  // 2. Si el usuario todavía no dio permiso o lo denegó
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

  // Función para capturar la foto
  const tomarFoto = async () => {
    if (cameraRef.current) {
      // El '?' previene errores si current llega a ser undefined en ese milisegundo
      const foto = await cameraRef.current?.takePictureAsync({
        quality: 0.5,
        base64: true,
      });
      console.log("¡Foto capturada!", foto?.uri);
    }
  };
  // 3. La vista principal con la cámara activa
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef}>
        {/* Capa visual oscura con el recuadro transparente en el medio */}
        <View style={styles.overlay}>
          <View style={styles.scanFrame} />
          <Text style={styles.scanText}>Centrá la botella en el recuadro</Text>
        </View>

        {/* Controles inferiores (Botón de captura) */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={tomarFoto}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  /* --- ESTILOS DE PERMISO --- */
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A110D", // Estilo oscuro que venimos manejando
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
  /* --- ESTILOS DE LA CÁMARA --- */
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // Fondo semitransparente oscuro
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 350,
    borderWidth: 2,
    borderColor: "#95D5B2",
    backgroundColor: "transparent", // El agujero para ver la botella
    borderRadius: 12,
  },
  scanText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
    paddingBottom: 80, // Espacio para que no pise el menú inferior
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFF",
  },
});
