import { UserCard } from "./components/UserCard";
import { IUser } from "./interfaces/user.interface";
import styles from "./Users.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  useFetchUsersByPageQuery,
  useLazyFetchUsersByPageQuery,
} from "./usersQuery";

import { appendUsers } from "./usersSlice";
import { useEffect, useCallback } from "react";

export const UserPage = () => {
  const page = useAppSelector((state: RootState) => state.users.page);
  const users = useAppSelector((state: RootState) => state.users.users);
  const dispatch = useAppDispatch();

  // const { isFetching, data } = useFetchUsersByPageQuery(page);
  const [trigger, { isFetching }] = useLazyFetchUsersByPageQuery();

  async function fetchUsers() {
    const { data } = await trigger(page);
    dispatch(appendUsers(data));
  }

  const memoFetch = useCallback(fetchUsers, []);

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
