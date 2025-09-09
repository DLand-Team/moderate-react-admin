export const dland = (isDark: boolean) => {
  return {
    components: {
      Button: {
        colorPrimary: "rgb(74, 164, 115)",
        defaultBg: "rgb(35, 43, 53)",
        algorithm: true,
        defaultColor: "rgba(255, 255, 255, 0.88)",
        defaultHoverBg: "rgb(51, 118, 103)",
        defaultActiveBg: "rgb(51, 118, 103)",
        defaultActiveColor: "rgb(255, 255, 255)",
        defaultHoverColor: "rgb(255, 255, 255)",
      },
      Menu: {
        borderRadius: 8,
        borderRadiusLG: 8,
        activeBarWidth: 10,
        lineWidth: -20,
        itemMarginInline: 10,
        colorBgContainer: isDark ? "rgba(22, 28, 36,0)" : "rgb(244, 246, 248)",
        itemSelectedBg: isDark ? "#1e1e31" : "rgb(208, 223, 242)",
        itemSelectedColor: isDark ? "#b985f4" : "7635dc",
      },
      Card: {
        borderRadiusLG: 16,
      },
      Tabs: {
        lineWidth: 0,
        marginXXS: 6,
        itemSelectedColor: "rgb(185, 133, 244)",
        colorFillAlter: isDark ? "#20252c" : "#dde1e6",
      },
    },
    token: {
      colorBgBase: isDark ? "rgb(22, 28, 36)" : "rgb(244, 246, 248)",
      colorPrimary: "#6e39d4",
      colorInfo: "#52b5d5",
      wireframe: false,
      colorSuccess: "#5ec269",
      colorWarning: "#f3af3d",
      borderRadius: 8,
    },
  };
};
