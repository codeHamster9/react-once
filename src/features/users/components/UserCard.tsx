import { IUser, Pokemon } from "../interfaces/user.interface";
import styles from "../Users.module.css";
import { FunctionComponent } from "react";

interface IUserProps {
  user: Pokemon;
}

export const UserCard: FunctionComponent<IUserProps> = ({
  user: { sprites, name },
}) => {
  return (
    <div>
      <img src={sprites.front_default} alt="pic" />
      <div className={styles.cardText}>{name}</div>
    </div>
  );
};
