## NOVA VARIÁVEL DE AMBIENTE

> 1 - Criar a nova variável de ambiente nos arquivos .env e .env.example

>.env file (deve ser adicionado ao .gitignore)
```env
# APP CONFIGURATION
APP_PORT=3000
NODE_ENV=development
BASE_URL=http://ranzinza-platform.local
```

>.env.example file (será comitado para o github)
```env
# APP CONFIGURATION
APP_PORT=3000
NODE_ENV=development
BASE_URL=http://ranzinza-platform.local
```

> 2- Adicionar validação da variável em src/config/env.validation.ts
>
> As variáveis de ambiente devem ser validadas na inicialização do app

```typescript
class EnvironmentVariables {
  //  APP CONFIGURATION
  @IsNumber()
  APP_PORT: number
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsString()
  BASE_URL: string
}
```