import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { Tooltip } from "react-tooltip";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li data-tooltip-id="Dark/Light" data-tooltip-content="Dark/Light Mode">
        <DarkModeToggle />
      </li>
      <li data-tooltip-id="logout" data-tooltip-content="Log out">
        <Logout />
      </li>
      <Tooltip
        id="Dark/Light"
        style={{
          backgroundColor: "var(--color-grey-900)",
          color: "var(--color-grey-50)",
          borderRadius: "5px",
          padding: "8px",
        }}
      />
      <Tooltip
        id="logout"
        style={{
          backgroundColor: "var(--color-grey-900)",
          color: "var(--color-grey-50)",
          borderRadius: "5px",
          padding: "8px",
        }}
      />
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
