import { UserCard } from "./components/UserCard";
import { IUser } from "./interfaces/user.interface";
import styles from "./Users.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useLazyFetchUsersByPageQuery } from "./usersQuery";

import { appendUsers } from "./usersSlice";
import { useEffect } from "react";

export const UserPage = () => {
  const page = useAppSelector((state: RootState) => state.users.page);
  const users = useAppSelector((state: RootState) => state.users.users);
  const dispatch = useAppDispatch();

  const [trigger, { isFetching }] = useLazyFetchUsersByPageQuery();

  async function fetchUsers() {
    const { data } = await trigger(page);
    dispatch(appendUsers(data));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <button onClick={() => fetchUsers()} disabled={isFetching}>
        Next
      </button>
      {users ? (
        <div className={styles.cardContainer}>
          {users.map((user: IUser, idx: number) => (
            <UserCard user={user} key={idx}></UserCard>
          ))}
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};
