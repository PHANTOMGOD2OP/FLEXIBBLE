type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

export const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
}: Props) => {
  return (
    <div className="flexStart flex-col gap-4 w-full">
      <label className="w-full text-gray-100">{title}</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          required
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          required
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};
