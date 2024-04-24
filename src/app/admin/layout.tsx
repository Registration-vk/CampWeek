"use client";

import { PageWrapper } from "@/components/ui/PageWrapper/PageWrapper";
import { useAppDispatch } from "@/core/store/hooks/typingHooks";
import { fetchAllUsers } from "@/core/store/services/fetchAllusers";
import { getAllUsers } from "@/core/store/slices/allUsersSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cls from "./styles.module.scss";
import { giveAdminRole } from "@/core/store/services/giveAdminRole";
import { Button } from "@/components/ui/Button/Button";
import { createRegionOnServer } from "@/core/store/services/createRegionOnServer";
import Input from "@/components/ui/Input/input";

export default function AdminPage() {
  const users = useSelector(getAllUsers);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const giveAdmineRole = (userId: number) => {
    dispatch(giveAdminRole(userId));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const createRegion = () => {
    console.log(inputValue)
    dispatch(createRegionOnServer(inputValue));
  };

  return (
    <PageWrapper>
      <div className={cls.inputWrapper}>
        <h3>Создать новый город</h3>
        <Input label="Введите город" onChange={handleInputChange}></Input>
        {/* <input type="text" value={inputValue} onChange={handleInputChange} /> */}
        <Button onClick={createRegion}>Создать</Button>
      </div>
      <div>
        <h2>Пользователи</h2>
        <table className={cls.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Город</th>
              <th>Дата рождения</th>
              <th>Выдать админку</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={`allUsersAdmin - ${user.id}`}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.city}</td>
                <td>{user.bdate}</td>
                <td onClick={() => giveAdmineRole(user.id)} className={cls.giveAdminRole}>
                  выдать админку
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
