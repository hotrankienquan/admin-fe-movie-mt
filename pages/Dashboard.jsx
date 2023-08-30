import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
export default function Dashboard() {
  const [textColor, setTextColor] = useState("red");
  let a = 1;
  console.log("🚀 ~ file: Dashboard.jsx:3 ~ Dashboard ~ a:", a);
  const textArr = [
    "Chào mừng",
    "Chào mừng Các bạn",
    "Chào mừng Các bạn Đến với Movie The Stone",
  ];
  return (
    <div className="px-[12px]">
      <p>Home</p>

      <>
        <div
          style={{
            fontSize: "35px",
            color: textColor,
            /* when working without ref and classNames, the manipulated style needs to be
         applied to the parent element, because the TypeAnimation component is perma-memoized */
          }}
        >
          <TypeAnimation
            sequence={[
              textArr[0],
              800,
              () => setTextColor("aqua"),
              textArr[1],
              800,
              () => setTextColor("deeppink"),
              textArr[2],
              1000,
              () => setTextColor("darkkhaki"),
              "",
            ]}
            repeat={Infinity}
          />
        </div>
        {/* <button
      onClick={() => {
        const items = [
          'blue',
          'green',
          'purple',
          'pink',
          'brown',
          'darkmagenta',
          'darksalmon',
          'dodgerblue',
          'firebrick',
          'darkviolet',
        ];
        setTextColor(items[Math.floor(Math.random() * items.length)]); // set random color
      }}
    >
      Change Color
    </button> */}
      </>
    </div>
  );
}
