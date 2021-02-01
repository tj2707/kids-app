import Swal from 'sweetalert2';

class AlertService {
  public async prompt(title: string, validator?: (value: string) => string): Promise<string> {
    const inputValidator = validator || this.defaultPrompValidator;
    const { value: entered } = await Swal.fire({
      title,
      input: 'text',
      showCancelButton: true,
      inputValidator
    });

    return entered;
  }

  public async confirm(title: string, confirmCb: () => Promise<any>): Promise<void> {
    await Swal.fire({
      title,
      type: 'question',
      preConfirm: confirmCb
    });
  }

  private defaultPrompValidator(value: string): string | null {
    if (!value) {
      return 'Please enter a value';
    }
    return null;
  }
}

const alertService = new AlertService();

export { AlertService, alertService };
