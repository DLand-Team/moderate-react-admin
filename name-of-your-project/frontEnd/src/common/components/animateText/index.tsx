import "react";
import { useRef } from "react";
import { useEffect } from "react";
import styles from "./index.module.scss";

let defaultRun: boolean = true;
let infinite: boolean = true;
let frameTime: number = 75;
let endWaitStep = 3;
let prefixString = "";
let runTexts = [""];
let colorTextLength = 5;
let step = 1;
let colors = [
  "rgb(110,64,170)",
  "rgb(150,61,179)",
  "rgb(191,60,175)",
  "rgb(228,65,157)",
  "rgb(254,75,131)",
  "rgb(255,94,99)",
  "rgb(255,120,71)",
  "rgb(251,150,51)",
  "rgb(226,183,47)",
  "rgb(198,214,60)",
  "rgb(175,240,91)",
  "rgb(127,246,88)",
  "rgb(82,246,103)",
  "rgb(48,239,130)",
  "rgb(29,223,163)",
  "rgb(26,199,194)",
  "rgb(35,171,216)",
  "rgb(54,140,225)",
  "rgb(76,110,219)",
  "rgb(96,84,200)",
];
let inst = {
  text: "",
  prefix: -(prefixString.length + colorTextLength),
  skillI: 0,
  skillP: 0,
  step: step,
  direction: "forward",
  delay: endWaitStep,
};

function randomNum(minNum: number, maxNum: number): number {
  switch (arguments.length) {
    case 1:
      return parseInt((Math.random() * minNum + 1).toString(), 10);
    case 2:
      return parseInt(
        (Math.random() * (maxNum - minNum + 1) + minNum).toString(),
        10
      );
    default:
      return 0;
  }
}
let randomTime: number = randomNum(15, 150);
let destroyed: boolean = false;
let continue2: boolean = false;
let infinite0: boolean = true;

function render(dom: HTMLDivElement, t: string, ut?: string): void {
  if (inst.step) {
    inst.step--;
  } else {
    inst.step = step;
    if (inst.prefix < prefixString.length) {
      inst.prefix >= 0 && (inst.text += prefixString[inst.prefix]);
      inst.prefix++;
    } else {
      switch (inst.direction) {
        case "forward":
          if (inst.skillP < t.length) {
            inst.text += t[inst.skillP];
            inst.skillP++;
          } else {
            if (inst.delay) {
              inst.delay--;
            } else {
              inst.direction = "backward";
              inst.delay = endWaitStep;
            }
          }
          break;
        case "backward":
          if (inst.skillP > 0) {
            inst.text = inst.text.slice(0, -1);
            inst.skillP--;
          } else {
            inst.skillI = (inst.skillI + 1) % runTexts.length;
            inst.direction = "forward";
          }
          break;
        default:
          break;
      }
    }
  }
  if (ut != null) {
    inst.text = ut.substring(0, inst.skillP);
    if (inst.skillP > ut.length) {
      inst.skillP = ut.length;
    }
  }
  dom.textContent = inst.text;
  let value;
  if (inst.prefix < prefixString.length) {
    value = Math.min(colorTextLength, colorTextLength + inst.prefix);
  } else {
    value = Math.min(colorTextLength, t.length - inst.skillP);
  }
  dom.appendChild(fragment(value));
}

function getNextColor(): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getNextChar(): string {
  return String.fromCharCode(94 * Math.random() + 33);
}
function fragment(value: number): DocumentFragment {
  let f = document.createDocumentFragment();
  for (let i = 0; value > i; i++) {
    let span = document.createElement("span");
    span.textContent = getNextChar();
    span.style.color = getNextColor();
    f.appendChild(span);
  }
  return f;
}
let flag = false;
export default (props) => {
  const { texts } = props;
  let container = useRef();
  let container2 = useRef();
  function init(): void {
    setTimeout(() => {
      if (destroyed) {
        return;
      }
      container.current && loop();
    }, randomTime);
  }
  function loop(): void {
    if (destroyed) {
      return;
    }
    setTimeout(() => {
      if (continue2 && container.current != null) {
        if (destroyed) {
          return;
        }
        let dom = container.current;
        let index = inst.skillI;
        let originText = texts[index];
        let currentText = runTexts[index];
        if (originText != currentText) {
          render(dom, currentText, originText);
          runTexts[index] = originText;
        } else {
          render(dom, currentText);
        }
      }
      if (infinite0) {
        loop();
      } else {
        if (inst.skillP < runTexts[0].length) {
          loop();
        }
      }
    }, frameTime);
  }
  useEffect(() => {
   {
      runTexts = texts;
      continue2 = defaultRun;
      infinite0 = infinite;
      inst.delay = endWaitStep;
      if (!infinite0) {
        if (runTexts.length > 1) {
          console.warn(
            "在设置infinite=false的情况下，仅第一个字符串生效，后续字符串不再显示。"
          );
        }
      }
      init();
    }
  }, []);
  return (
    <div className={styles.content}>
      <pre ref={container} className={styles.container} id="container"></pre>
      <pre ref={container2}></pre>
    </div>
  );
};
