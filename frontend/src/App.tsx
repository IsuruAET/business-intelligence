import { Provider } from "react-redux";
import { store } from "./app/store";
import { RAGForm } from "./features/rag/RAGForm";

function App() {
  return (
    <Provider store={store}>
      <RAGForm />
    </Provider>
  );
}

export default App;
