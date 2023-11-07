import { useEffect, useState } from "react";


export const App = () => {
  const [padding, setPadding] = useState(0);

  useEffect(() => {
    // setInterval(() => {
    //   setPadding(oldPadding => {
    //     return oldPadding + 1
    //   })
    // }, 2000)
  });

  return (
    <div style={{ backgroundColor: 'lightblue', color: "white", padding: padding }}>
      Teste
    </div>
  );
}
