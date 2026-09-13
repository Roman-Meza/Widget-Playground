export function ScrollToTopBtn() {

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <button
      className={"counter"}
      onClick={() => scrollToTop()}
    >
      Back to top
    </button>
  );
}

export function scrollToTop() {
    window.scrollTo(0, 0);
  }