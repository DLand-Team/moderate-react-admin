import { Form } from "antd";
import React from "react";
import { Blocker, BlockerFunction, useActionData, useBlocker } from "react-router-dom";
function ConfirmNavigation({ blocker }: { blocker: Blocker }) {
    if (blocker.state === "blocked") {
        return (
            <>
                <p style={{ color: "red" }}>
                    Blocked the last navigation to {blocker.location.pathname}
                </p>
                <button onClick={() => blocker.proceed?.()}>Let me through</button>
                <button onClick={() => blocker.reset?.()}>Keep me here</button>
            </>
        );
    }

    if (blocker.state === "proceeding") {
        return (
            <p style={{ color: "orange" }}>Proceeding through blocked navigation</p>
        );
    }

    return <p style={{ color: "green" }}>Blocker is currently unblocked</p>;
}
export function ImportantForm() {
    let actionData = useActionData() as { ok: boolean } | undefined;
    let [value, setValue] = React.useState("");
    // Allow the submission navigation to the same route to go through
    let shouldBlock = React.useCallback<BlockerFunction>(
        ({ currentLocation, nextLocation }) =>
            value !== "" && currentLocation.pathname !== nextLocation.pathname,
        [value]
    );
    let blocker = useBlocker(shouldBlock);

    // Clean the input after a successful submission
    React.useEffect(() => {
        if (actionData?.ok) {
            setValue("");
        }
    }, [actionData]);

    // Reset the blocker if the user cleans the form
    React.useEffect(() => {
        if (blocker.state === "blocked" && value === "") {
            blocker.reset();
        }
    }, [blocker, value]);

    return (
        <>
            <p>
                Is the form dirty?{" "}
                {value !== "" ? (
                    <span style={{ color: "red" }}>Yes</span>
                ) : (
                    <span style={{ color: "green" }}>No</span>
                )}
            </p>

            <Form method="post">
                <label>
                    Enter some important data:
                    <input
                        name="data"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </label>
                <button type="submit">Save</button>
            </Form>

            {blocker ? <ConfirmNavigation blocker={blocker} /> : null}
        </>
    );
}