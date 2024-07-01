import { SetMetadata } from '@nestjs/common';

export const PublicAPI = () => SetMetadata('IsPublic', true);
