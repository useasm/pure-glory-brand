import { Drawer } from '../ui/Drawer';
import { AuthPanel } from '../account/AuthPanel';
import { CabinetPanel } from '../account/CabinetPanel';
import { useAuth } from '../../store/AuthContext';
import { useUI } from '../../store/UIContext';

/** Shows the auth forms when signed out and the account panel when signed in. */
export function AccountDrawer() {
  const { user } = useAuth();
  const { overlay, closeOverlay } = useUI();
  const open = overlay === 'account';

  return (
    <Drawer
      open={open}
      onClose={closeOverlay}
      eyebrow={user ? 'Account' : 'Pure Glory'}
    >
      {user ? <CabinetPanel onClose={closeOverlay} /> : <AuthPanel />}
    </Drawer>
  );
}
