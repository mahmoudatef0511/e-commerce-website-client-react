function CustomButton({
  children,
  onClick,
  disabled = false,
  dataTestID = "",
}) {
  return disabled ? (
    <button
      data-testid={dataTestID}
      onClick={onClick}
      className="w-50 custom-btn disabled"
      disabled
    >
      {children}
    </button>
  ) : (
    <button
      data-testid={dataTestID}
      onClick={onClick}
      className="w-50 custom-btn"
    >
      {children}
    </button>
  );
}

export default CustomButton;
