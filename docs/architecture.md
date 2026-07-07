# Architecture Notes

## Current Decision

The project starts as a monorepo with separate folders for the frontend,
backend, and documentation.

## Why

The product is still in an early stage, so keeping everything in one repository
makes development, review, and project navigation simpler.

This structure still leaves room to separate parts of the system later if there
is a real reason to do it.

## Initial Structure

- `frontend`: web application and game UI
- `backend`: API, authentication, and business logic
- `docs`: architecture notes and product decisions

## Future Ideas

- user authentication
- language selection
- game modules
- user progress and points
- possible service separation later
