import { FormInstance } from "antd";
import { useMemo } from "react";
import { MyColumnType, itemCreater } from "src/common/utils";
import { useFlat } from "src/service";
import { UserEntity } from "src/service/stores/userStore/model";

const item = itemCreater<UserEntity>;
const useConfig = (_?: FormInstance) => {
	const { currentData, setCurrentData, setIsShowDeatilModal } =
		useFlat("userStore");

	//@ts-ignore
	return useMemo<MyColumnType<UserEntity>[]>(() => {
		return [
			item("id", {
				render(e, record) {
					return (
						<a
							onClick={() => {
								setCurrentData(record);
								setIsShowDeatilModal(true);
							}}
						>
							{e}
						</a>
					);
				},
			}),
			item("email"),
			item("first_name"),
			item("last_name"),
			item("nick_name"),
			item("role"),
			item("title"),
			item("company_name"),
			item("mobile"),
		];
	}, [currentData]);
};

export default useConfig;
