import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  /* margin: auto 30px auto 30px; */
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// function Modal({ children, onClose }) {
//   return (
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onClose}>
//           <HiXMark />
//         </Button>
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>
//   );
// }

// export default Modal;

////******************************************************** React Portal
// Let's now improve this here using something called a React portal. So a React portal is a feature that essentially allows us to render an element outside of the parent component's DOM structure while still keeping the element in the original position of the component tree.
// So in other words, with a portal we can basically render a component in any place that we want inside the DOM tree but still leave the component at the same place in the React component tree.
// And so then things like props keep working normally. And so this is great and generally used for all elements that we want to stay on top of other elements. So things like modal windows, tool tips, menus and so on.

// So how we do it, So instead of just returning this JSX here we return the results of calling createPortal. So, createPortal. And this one is actually not part of React but of React DOM, which actually makes sense because this really is about placing some JSX in the DOM. Now then this function here receives as the first argument
// the JSX that we want to render. And then as the second argument, a DOM note where we want to render this JSX. And so let's just do this in the document body. And so that we can select
// simply by writing document.body. All right. But it could of course be also any other element as well and we could select it, for example, using document.querySelector or any other way. But anyway, let's now go back to just attaching this to the document body,
// even though some developers say that this is not ideal, but actually it does work just fine.

// now notice how the modal window is actually a direct child element of the body element. And so that's because we selected that body right here. And so the reason for that is that here we selected that body element to be the parent element of whatever we want to render.
// But now you might be wondering, this worked really great already in the beginning with just regular CSS positioning, so without the portal. And so why do we even need to use this portal? Well, the main reason why a portal becomes necessary
// is in order to avoid conflicts with the CSS property overflow set to hidden. So many times we build a component like a modal and it works just fine, but then some other developer will reuse it somewhere else and that somewhere else might be a place where the modal will get cut off
// by a overflow hidden set on the parent. So this is basically all about reusability and making sure that the component will never be cut off by an overflow property set to hidden on some parent element. So in order to avoid this kind of situation we simply render the modal completely outside of the rest of the DOM.

// function Modal({ children, onClose }) {
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onClose}>
//           <HiXMark />
//         </Button>
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

// export default Modal;

////****************************************************** Converting the Modal to a Compound Component
// If you see in AddCabin.jsx how can we connect that event handler now at button in <Modal.Open> <Button>
// to make it a bit more explicit. So opensWindowName.
// const clonedElement = cloneElement(element, props, ...children)

// // step 1 create context
// const ModalContext = createContext();

// // step 2 create parent component
// function Modal({ children }) {
//   const [openName, setOpenName] = useState("");
//   const close = () => setOpenName("");
//   const open = setOpenName;
//   return (
//     <ModalContext.Provider value={{ openName, close, open }}>
//       {children}
//     </ModalContext.Provider>
//   );
// }

// // step 3 create child components
// function Open({ children, opens: opensWindowName }) {
//   const { open } = useContext(ModalContext);
//   return cloneElement(children, { onClick: () => open(opensWindowName) });
// }

// function Window({ children, name }) {
//   const { openName, close } = useContext(ModalContext);
//   if (name !== openName) return null;
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         <Button onClick={close}>
//           <HiXMark />
//         </Button>
//         <div>
//           {cloneElement(children, {
//             onCloseModal: close,
//           })}
//         </div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

// // step 4 attached child properties to parent
// Modal.Open = Open;
// Modal.Window = Window;

// export default Modal;

////***************************************************************** Detecting Click outside the modal

// // step 1 create context
// const ModalContext = createContext();

// // step 2 create parent component
// function Modal({ children }) {
//   const [openName, setOpenName] = useState("");
//   const close = () => setOpenName("");
//   const open = setOpenName;
//   return (
//     <ModalContext.Provider value={{ openName, close, open }}>
//       {children}
//     </ModalContext.Provider>
//   );
// }

// // step 3 create child components
// function Open({ children, opens: opensWindowName }) {
//   const { open } = useContext(ModalContext);
//   return cloneElement(children, { onClick: () => open(opensWindowName) });
// }

// function Window({ children, name }) {
//   const { openName, close } = useContext(ModalContext);
//   const ref = useRef();

//   useEffect(() => {
//     //// do not do this otherwise form/table itself will never open
//     // function handleClick(e) {
//     //   close();
//     // }

//     function handleClick(e) {
//       if (ref.current && !ref.current.contains(e.target)) {
//         console.log("clicked outside");
//         close();
//       }
//     }
//     document.addEventListener("click", handleClick);
//     return () => {
//       removeEventListener("click", handleClick);
//     };
//   }, [close]);

//   if (name !== openName) return null;
//   return createPortal(
//     <Overlay>
//       <StyledModal ref={ref}>
//         <Button onClick={close}>
//           <HiXMark />
//         </Button>
//         <div>
//           {cloneElement(children, {
//             onCloseModal: close,
//           })}
//         </div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

// // step 4 attached child properties to parent
// Modal.Open = Open;
// Modal.Window = Window;

// export default Modal;

/////********************************************* Refactoring create custom hook
// hooks/useOutsideClick.jsx

// step 1 create context
const ModalContext = createContext();

// step 2 create parent component
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// step 3 create child components
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children, {
            onCloseModal: close,
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// step 4 attached child properties to parent
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
