import { IUser } from "../interfaces/user.interface";
import styles from "../Users.module.css";
import { FunctionComponent } from "react";

interface IUserProps {
  user: IUser;
}

export const UserCard: FunctionComponent<IUserProps> = ({
  user: { picture, name },
}) => {
  return (
    <div>
      <img src={picture.medium} alt="pic" />
      <div className={styles.cardText}>{name.first}</div>
    </div>
  );
};
