import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'group flex items-center justify-center web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-brand web:hover:opacity-90 active:opacity-90', // mod
        inline: 'bg-white web:hover:opacity-90 active:opacity-90 border border-brand',
      },
      size: {
        default: 'px-4 py-3', // mod
        inline: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const buttonTextVariants = cva(
  'web:whitespace-nowrap text-sm native:text-base font-Pretendard-Regular text-foreground web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-white text-base', // mod
        inline: 'text-brand text-base',
      },
      size: {
        default: '',
        inline: 'w-full px-4 ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> & VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <TextClassContext.Provider
        value={cn(buttonTextVariants({ variant, size }), props.disabled && 'text-[#505050]')}>
        <Pressable
          className={cn(
            buttonVariants({ variant, size, className }),
            props.disabled && 'bg-[#F1F1F5] web:pointer-events-none',
            props.disabled && size === 'default' && 'border-[#E5E5EC] bg-[#E5E5EC]',
          )}
          ref={ref}
          role='button'
          {...props}
        />
      </TextClassContext.Provider>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
