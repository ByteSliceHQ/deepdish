# DeepDish CLI

The DeepDish command line interface (CLI) provides a powerful way to interact with DeepDish Cloud services directly from your terminal.

## Installation

### Using npm
```bash
npx deepdish [command]
# or
pnpx deepdish [command]
# or
yarn dlx deepdish [command]
# or
bunx deepdish [command]
```

## Requirements

- Node.js >= 22
- Internet connection for cloud operations

## Getting Started

### 1. Create an Account

If you don't have a DeepDish account yet, create one:

```bash
deepdish cloud auth signup
```

This will open your browser to complete the signup process.

### 2. Log In

If you already have an account, log in:

```bash
deepdish cloud auth login
```

### 3. Create Your First Project

Create a new project to get started:

```bash
deepdish cloud project create --name "my-awesome-project"
```

### 4. Select Your Project

Choose which project to work with:

```bash
deepdish cloud project select
```

## Available Commands

### Global Commands

| Command | Description |
|---------|-------------|
| `deepdish --help` | Show help information |
| `deepdish --version` | Show version information |

### Cloud Commands

The CLI is organized around cloud operations. All cloud-related commands are under the `cloud` namespace.

#### Authentication (`cloud auth`)

Manage your DeepDish Cloud account authentication.

| Command | Description |
|---------|-------------|
| `deepdish cloud auth login` | Log in with an existing account |
| `deepdish cloud auth logout` | Log out of your current account |
| `deepdish cloud auth signup` | Create a new account |

**Examples:**
```bash
# Log in to your account
deepdish cloud auth login

# Create a new account
deepdish cloud auth signup

# Log out
deepdish cloud auth logout
```

#### Project Management (`cloud project`)

Manage your DeepDish Cloud projects.

| Command | Description |
|---------|-------------|
| `deepdish cloud project create --name <name>` | Create a new project |
| `deepdish cloud project list` | List all of your projects |
| `deepdish cloud project select` | Select a project to be your active one |

**Examples:**
```bash
# Create a new project
deepdish cloud project create --name "my-project"

# List all projects
deepdish cloud project list

# Select a project to work with
deepdish cloud project select
```

#### Project Keys (`cloud project key`)

Manage API keys for your projects.

| Command | Description |
|---------|-------------|
| `deepdish cloud project key create` | Create a new API key for the current project |

**Examples:**
```bash
# Create a new API key
deepdish cloud project key create
```

#### Billing (`cloud billing`)

Manage your billing and subscription.

| Command | Description |
|---------|-------------|
| `deepdish cloud billing open` | Open the billing page in your browser |

**Examples:**
```bash
# Open billing page
deepdish cloud billing open
```

## Command Structure

The DeepDish CLI follows a hierarchical command structure:

```
deepdish [command] [subcommand] [options]
```

### Command Groups

- **`cloud`** - All cloud-related operations
  - **`auth`** - Authentication and account management
  - **`project`** - Project management
    - **`key`** - API key management
  - **`billing`** - Billing and subscription management

## Getting Help

### Command Help

Get help for any command or subcommand:

```bash
deepdish --help
deepdish cloud --help
deepdish cloud auth --help
deepdish cloud project --help
```

### Interactive Selection

Many commands provide interactive interfaces for better user experience. For example, when selecting a project, you'll see a list of available projects to choose from.

## Environment Variables

The CLI automatically handles environment configuration for different environments (development, staging, production).

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Ensure you're logged in: `deepdish cloud auth login`
   - Check your internet connection

2. **Project Not Found**
   - List your projects: `deepdish cloud project list`
   - Select the correct project: `deepdish cloud project select`

3. **Permission Errors**
   - Ensure you have the necessary permissions for the project
   - Contact your project administrator if needed

### Getting Support

If you encounter issues not covered here:

1. Check the [DeepDish documentation](https://docs.deepdish.app)
2. Contact us at [support@deepdish.app](mailto:support@deepdish.app)

## Version History

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history and release notes.

## Contributing

The DeepDish CLI is open source. Contributions are welcome! Please see the main [DeepDish repository](https://github.com/byteslicehq/deepdish) for contribution guidelines.

## License

This project is licensed under the terms specified in the main DeepDish repository.
