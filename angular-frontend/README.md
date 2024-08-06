### Angular Frontend

**Setup Requirements:**
- Angular CLI version 16
- Node.js version 18

**Installation and Running:**

1. **Install Packages:**
   ```bash
   npm install
   ```

2. **Start the Project:**
   ```bash
   ng serve
   ```
   The project will run on port `4200`.

**Testing URLs:**

1. **Regular Component**
   - **URL:** `http://localhost:4200/`
   - **Description:** Renders the `regular` component, which is not loaded lazily.

2. **Lazy-Loaded Module**
   - **URL:** `http://localhost:4200/hello`
   - **Description:** Renders the `hello` page with the lazy-loaded module.

These URLs allow you to test both a component that is loaded eagerly and a module that is loaded lazily.

---