import { ComponentType, ReactNode, RefObject, type JSX } from "react";
import { emit } from "../setup";
import HelperBase from "./_helperBase";
import { UUID } from "@/src/common/utils";
import { Driver } from "driver.js";

export class AppHelper extends HelperBase {
  modalMap: Record<
    string,
    { Content: ReactNode; Header: ReactNode; Footer: ReactNode }
  > = {};
  guideIns: RefObject<Driver> | null = null;
  setGuideIns(guideIns: RefObject<Driver>) {
    this.guideIns = guideIns;
  }
  getGuideIns() {
    debugger
    return this.guideIns?.current;
  }
  createApp(
    providerList: (
      | ((props: { children?: ReactNode }) => JSX.Element)
      | (({ ...props }: { [x: string]: any }) => JSX.Element)
    )[],
  ) {
    return this.providerLoop(providerList);
  }

  providerLoop(
    providerList: (
      | ((props: { children?: ReactNode }) => JSX.Element)
      | (({ ...props }: { [x: string]: any }) => JSX.Element)
    )[],
    i = 0,
  ) {
    if (i === providerList.length) {
      return;
    }
    const Pv = providerList[i];
    return <Pv key={i}>{this.providerLoop(providerList, i + 1)}</Pv>;
  }
  showModal({
    Content,
    Header,
    Footer,
  }: {
    Content?: ({ closeModal }: { closeModal: () => void }) => ReactNode;
    Header?: ({ closeModal }: { closeModal: () => void }) => ReactNode;
    Footer?: ({ closeModal }: { closeModal: () => void }) => ReactNode;
  }) {
    const id = UUID();
    const api: { closeModal: () => void } = {
      closeModal: () => {
        emit("appStore").updateModalStatus({
          id,
          isShow: false,
        });
      },
    };
    this.modalMap[id] = {
      Content: Content && <Content closeModal={api.closeModal} />,
      Header: Header && <Header closeModal={api.closeModal} />,
      Footer: Footer && <Footer closeModal={api.closeModal} />,
    };
    emit("appStore").updateModalStatus({
      id,
      isShow: true,
    });
    return id;
  }
  getModalContent({ modalContentId }: { modalContentId?: string }) {
    return this.modalMap[modalContentId || ""] || null;
  }
  removeModal(id: string) {
    delete this.modalMap[id];
  }
  getModalMap() {
    return this.modalMap;
  }
}
