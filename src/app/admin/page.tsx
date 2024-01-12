"use client"
import { useState } from "react";

import { Button } from "@/components/ui";
import { useEventsAll, useUsersAll } from "@/core/hooks";

import styles from "./styles.module.scss"



export default function AdminPanel () {
	const {data, refetch} = useUsersAll(false);

	const getAllUsers = async () => {
		await refetch();
	}

	return (
		<div>
			<h1>Страница админа</h1>
			<Button className={styles.button} onClick={getAllUsers}>Получить список пользователей</Button>
			<Button>Получить список всех мероприятий</Button>
			{data && data.map((user) => {
				return (
					<div key={user.id}>
						{user.first_name}
						<div>
						{user.last_name}
						{user.bdate}
						{user.sex}
						</div>
					</div>
				)
			})}
		</div>
	)
}