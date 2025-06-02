'use client';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@heroui/input';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/button';
import { trpc } from '@src/modules/utils/trpc';
import { Form, Select, SelectItem } from '@heroui/react';

const TeamSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name is required',
    })
    .min(1, 'Name is required'),
  users: z.array(z.number()).optional(),
});

type TeamInput = z.infer<typeof TeamSchema>;

export default function TeamForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TeamInput>({
    resolver: zodResolver(TeamSchema),
  });

  const utils = trpc.useUtils();
  const createTeam = trpc.team.createTeam.useMutation({
    onSuccess: () => {
      utils.team.getTeams.invalidate();
      router.push('/team');
    },
  });

  const { data: users = [], isLoading } = trpc.user.getUsers.useQuery();

  const onSubmit = (data: TeamInput) => {
    createTeam.mutate(data);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full justify-center items-center space-y-4">
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            isRequired
            label="Team Name"
            onChange={onChange}
            value={value || ''}
            errorMessage={errors.name?.message}
          />
        )}
      />
      <Controller
        name="users"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            className="max-w-xs"
            isRequired
            placeholder="Select users"
            label="Users"
            selectionMode="multiple"
            selectedKeys={new Set(value?.map(String))}
            onSelectionChange={keys => {
              const ids = Array.from(keys).map(k => Number(k));
              onChange(ids);
            }}
            isLoading={isLoading}>
            {users.map(user => (
              <SelectItem className="flex flex-col" key={user.id.toString()}>
                <p>{user.name}</p>
                <p>{user.userTeams[0].role}</p>
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <Button type="submit">Create</Button>
    </Form>
  );
}
