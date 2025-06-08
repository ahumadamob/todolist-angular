document.addEventListener('DOMContentLoaded', () => {
  const toggleTop = document.getElementById('sidebarToggleTop');
  if (toggleTop) {
    toggleTop.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-toggled');
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.classList.toggle('toggled');
      }
    });
  }
});
