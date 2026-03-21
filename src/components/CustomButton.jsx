function CustomButton({
  children,
  onClick,
  isDisabled = true,
  dataTestID = "",
}) {
  return (
    <button
      data-testid={dataTestID}
      onClick={onClick}
      className={`w-50 custom-btn ${isDisabled ? "disabled" : ""}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default CustomButton;
