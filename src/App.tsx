import { MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./App.css";
import "./index.css";
import MainTree from "./components/tree";
import { Provider } from "react-redux";
import { store } from "./store/index";

function App() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
    },
  });
  return (
    <Provider store={store}>
      <MantineProvider>
        <MainTree />
      </MantineProvider>
    </Provider>
  );
}

export default App;
