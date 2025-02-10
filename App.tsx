import Routes from "./src/routes/index";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </GluestackUIProvider>
  );
}
