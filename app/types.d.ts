interface Window {
  Telegram: {
    WebApp: {
      ready: () => void;
      MainButton: {
        setText: (text: string) => void;
        show: () => void;
        hide: () => void;
        onClick: (callback: () => void) => void;
      };
      sendData: (data: string) => void;
      close: () => void;
      showAlert: (message: string) => void;
      openTelegramLink: (url: string) => void;
    };
  };
}
