'use client';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@src/modules/utils/trpc';
import { Input, Select, SelectItem, Button, Form, Checkbox } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { RoleEnum, UserInput, UserSchema } from '../user.schema';
import { PlusCircle } from 'lucide-react';

export default function UserForm() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInput>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      teams: [{ teamId: undefined, role: 'MEMBER' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teams',
  });

  const { data: teams = [] } = trpc.team.getTeams.useQuery();
  const createUser = trpc.user.createUser.useMutation({
    onSuccess: () => router.push('/user'),
  });

  const onSubmit = (data: UserInput) => {
    createUser.mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
      {/* Basic fields */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            className="max-w-xs"
            isRequired
            label="User Name"
            {...field}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            className="max-w-xs"
            isRequired
            label="Email"
            {...field}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <Input
            className="max-w-xs"
            isRequired
            label="Phone Number"
            {...field}
            value={field.value?.toString() || ''}
            errorMessage={errors.phoneNumber?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="isLeader"
        render={({ field }) => (
          <Checkbox checked={field.value} onCheckedChange={field.onChange} size="lg">
            Is Leader
          </Checkbox>
        )}
      />

      {/* Team/Role section */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-end">
            <Controller
              control={control}
              name={`teams.${index}.teamId`}
              render={({ field: selectField }) => (
                <Select
                  selectedKeys={new Set([String(selectField.value)])}
                  onSelectionChange={keys => selectField.onChange(Number(Array.from(keys)[0]))}
                  label="Team"
                  className="flex-1">
                  {teams
                    .filter(team => !fields.some((f, i) => i !== index && f.teamId === team.id))
                    .map(team => (
                      <SelectItem key={String(team.id)}>{team.name}</SelectItem>
                    ))}
                </Select>
              )}
            />

            <Controller
              control={control}
              name={`teams.${index}.role`}
              render={({ field: selectField }) => (
                <Select
                  selectedKeys={new Set([selectField.value])}
                  onSelectionChange={keys =>
                    selectField.onChange(Array.from(keys)[0] as UserInput['teams'][number]['role'])
                  }
                  label="Role"
                  className="w-40">
                  {RoleEnum.options.map(role => (
                    <SelectItem key={role}>{role}</SelectItem>
                  ))}
                </Select>
              )}
            />

            <Button
              variant="ghost"
              onClick={() => remove(index)}
              type="button"
              isIconOnly
              disabled={fields.length === 1}>
              ❌
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() => append({ teamId: number, role: 'MEMBER' })}
          startContent={<PlusCircle size={16} />}>
          Add Team
        </Button>
      </div>

      <Button type="submit">Create User</Button>
    </Form>
  );
}
