# Error 01: Error happen when custom repository in TypeORM, NestJs - Dependency Injection

# current task: CRUD task

![alt text](image-1.png)

## Solution:

Cách 1

```
- Bỏ tầng Repo đi, code luôn logic trong service
```

Cách 2

```
- Read document TypeORM, NestJs
- Sử dụng custom repository
```

# Trace

## After fix 1: @EntityRepository no longer be deprecated

![alt text](image.png)

```
- Thu tu xay base bang tay xem, ko dung generate
- Try copy all code from sample project
```

CORE: tìm hiểu về luồng Dependency Injection trong NestJs - YT NestJs đại pháp

## After fix 2:

Fix 2

```
- Ko dung repository, dung service luon
```
