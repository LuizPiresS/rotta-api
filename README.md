# RANZINZA PLATFORM

## DOCUMENTAÇÃO
## Arquitetura

 > [Lean Architecture](./docs/concepts/lean-architecture.md)

 ## Design Pattern
 > [DTOs](./docs/concepts/dtos-pattern.md)

 > [Service Pattern](./docs/concepts/service-pattern.md)

 > [Repository Pattern](./docs/concepts/repository-pattern.md)


## Principles
> [Single Responsibility Principle](./docs/concepts/single-responsibility-principle.md)

>[Dependency Inversion Principle](./docs/concepts/dependency-inversion-principle.md) 
### Gerar documentação
```bash
npm run doc
```

## AMBIENTE DE DESENVOLVIMENTO
> Adicionar o domínio ao final arquivo hosts "/etc/hosts¨
```BASH
sudo nano /etc/hosts
```
```bash
127.0.0.1       rotta.api.local

```
> Cria os hooks do huskyjs
```bash
npm run prepare
```

> Sobe os docker com ambiente de desenvolvimento
```bash
docker compose down && docker compose up -d
```

## NOVA VARIÁVEL DE AMBIENTE

>[Nova variável de ambiente](./docs/how-to-make/environment-variables.md) 

## NOVA FEATURE
>[Novo módulo](./docs/how-to-make/new-module.md)

>[Novo DTO](./docs/how-to-make/new-dto.md)

>[Novo Resolver](./docs/how-to-make/new-resolver.md) 

>[Novo Service](./docs/how-to-make/new-service.md)

>[Novo Erro](./docs/how-to-make/new-service.md)

>[Novo Model](./docs/how-to-make/new-model.md)

>[Novo Repository](./docs/how-to-make/new-repository.md) 

## Framework
> NestJS
> 
> https://nestjs.com/
## LIBS
### Qualidade de software
> huskyjs 
> 
> https://github.com/typicode/husky

> lint-staged
>
> https://github.com/okonet/lint-staged

> git-commit-msg-linter
>
> https://www.npmjs.com/package/git-commit-msg-linter

### Documentação
> @compodoc/compodoc 
> 
> https://compodoc.app/

### ORM 
> Prisma
> 
>  https://www.prisma.io/