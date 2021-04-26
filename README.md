# CSV re-arranger

An example project to showcase front-end architecture, state management and SCSS.

It is built on NextJS (because NextJS is the best) and uses:
- **Recoil** - for state management
- **SCSS modules** - for theme, scoped styling, and global helper classes / utility mixins and functions
- **TypeScript** - all components and variables are well-typed

### The application

This example application, a CSV "re-arranger" allows you to:
- select a CSV file
- sort or exclude content by the file's headers
- download the new CSV file

This is accomplished client-side, using a FileReader.

### Run it

Start the server with:

```bash
npm run dev
```

or build and run for production with:

```bash
npm run build && npm start
```

### Known issues (the /* todo */ list)
- Retain headers configuration when navigating back and forth through steps
- Correctly escape commas and quotes in created file
