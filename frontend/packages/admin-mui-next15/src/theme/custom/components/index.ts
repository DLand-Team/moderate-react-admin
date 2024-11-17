import { appBar } from "./appbar";
import { breadcrumbs } from "./breadcrumbs";
import { button } from "./button";
import { card } from "./card";
import { checkbox } from "./checkbox";
import { menu } from "./menu";
import { datePicker } from "./mui-x-date-picker";
import { popover } from "./popover";
import { select } from "./select";
import { table } from "./table";
import { tabs } from "./tabs";
import { textfield } from "./textfield";
import { typography } from "./typography";

// ----------------------------------------------------------------------

export const components = {
	...table,
	...tabs,
	...checkbox,
	...menu,
	...textfield,
	...card,
	...typography,
	...select,
	...datePicker,
	...breadcrumbs,
	...button,
	...popover,
	...appBar,
};
