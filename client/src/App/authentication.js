const fakeAuth = {
   isAuthenticated: false,
   authenticate(callback) {
      this.isAuthenticated = true;
      setTimeout(callback, 100);
   },
   signOut(callback) {
      this.isAuthenticated = false;
      setTimeout(callback, 100);
   }
}

export default fakeAuth