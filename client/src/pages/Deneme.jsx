
import axios from "axios";

const Deneme = () => {
  const yolla = async () => {//credentials
    try {
      const response = await axios.get("http://localhost:3001/api/protected", { withCredentials: true });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button type="button" onClick={yolla}>Gönder</button>
    </div>
  );
};

export default Deneme;

