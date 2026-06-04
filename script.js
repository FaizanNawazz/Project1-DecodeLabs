class UIOrchestrator {
  constructor() {
    // Safe Application States
    this.state = {
      navActive: false,
      activeLayout: "grid", // 'grid' | 'list'
      visualVibe:
        document.documentElement.getAttribute("data-vibe") || "default",
    };

    // DOM Element Token Storage
    this.elements = {
      html: document.documentElement,
      menuBtn: document.querySelector(".menu-toggle"),
      navBar: document.querySelector(".main-nav"),
      themeBtn: document.getElementById("theme-btn"),
      viewSwitchers: document.querySelectorAll(".view-btn"),
      gridContainer: document.getElementById("interactive-grid"),
    };

    this.bootLifecycle();
  }

  bootLifecycle() {
    // Nav Toggle System Trigger
    if (this.elements.menuBtn && this.elements.navBar) {
      this.elements.menuBtn.addEventListener("click", () =>
        this.handleNavToggle(),
      );
      document.addEventListener("keydown", (e) => this.catchKeyboardEscape(e));
    }

    // Theme Switch Trigger
    if (this.elements.themeBtn) {
      this.elements.themeBtn.addEventListener("click", () =>
        this.switchSystemAesthetic(),
      );
    }

    // Grid/List Multi View Handler Engine
    this.elements.viewSwitchers.forEach((button) => {
      button.addEventListener("click", (e) =>
        this.switchViewLayout(e.currentTarget),
      );
    });

    // Viewport Mutation Change Guards
    window.addEventListener(
      "resize",
      this.debounceWindow(() => this.validateLayoutBoundaries(), 100),
    );
  }

  handleNavToggle() {
    this.state.navActive = !this.state.navActive;
    this.elements.menuBtn.setAttribute(
      "aria-expanded",
      this.state.navActive.toString(),
    );
    this.elements.navBar.classList.toggle("active", this.state.navActive);
    this.elements.menuBtn.textContent = this.state.navActive ? "✕" : "☰";
  }

  switchSystemAesthetic() {
    const nextVibe =
      this.state.visualVibe === "grounded" ? "default" : "grounded";
    this.state.visualVibe = nextVibe;

    if (nextVibe === "grounded") {
      this.elements.html.setAttribute("data-vibe", "grounded");
      this.elements.themeBtn.textContent = "Restore Vibe";
    } else {
      this.elements.html.removeAttribute("data-vibe");
      this.elements.themeBtn.textContent = "Shift Aesthetic Vibe";
    }
  }

  switchViewLayout(targetButton) {
    const designatedView = targetButton.getAttribute("data-view");
    if (this.state.activeLayout === designatedView) return;

    // Clean layout class links
    this.elements.viewSwitchers.forEach((btn) =>
      btn.classList.remove("active"),
    );
    targetButton.classList.add("active");

    this.state.activeLayout = designatedView;

    if (designatedView === "list") {
      this.elements.gridContainer.classList.add("list-view");
    } else {
      this.elements.gridContainer.classList.remove("list-view");
    }
  }

  validateLayoutBoundaries() {
    if (window.innerWidth >= 768 && this.state.navActive) {
      this.handleNavToggle();
    }
  }

  catchKeyboardEscape(e) {
    if (e.key === "Escape" && this.state.navActive) {
      this.handleNavToggle();
      this.elements.menuBtn.focus();
    }
  }

  debounceWindow(callback, delay) {
    let clockId;
    return (...args) => {
      clearTimeout(clockId);
      clockId = setTimeout(() => callback.apply(this, args), delay);
    };
  }
}

// Initial Run Initialization
document.addEventListener("DOMContentLoaded", () => {
  window.PortalEngine = new UIOrchestrator();
});
